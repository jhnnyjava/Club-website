import axios from 'axios'

interface MpesaConfig {
  consumerKey: string
  consumerSecret: string
  passkey: string
  businessShortCode: string
  environment: 'sandbox' | 'production'
  callbackUrl: string
}

interface STKPushRequest {
  phoneNumber: string
  amount: number
  accountReference: string
  transactionDesc: string
}

interface STKPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

interface MpesaCallbackResult {
  ResultCode: number
  ResultDesc: string
}

export class MpesaService {
  private config: MpesaConfig
  private baseUrl: string

  constructor() {
    this.config = {
      consumerKey: process.env.MPESA_CONSUMER_KEY!,
      consumerSecret: process.env.MPESA_CONSUMER_SECRET!,
      passkey: process.env.MPESA_PASSKEY!,
      businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE!,
      environment: (process.env.MPESA_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
      callbackUrl: process.env.MPESA_CALLBACK_URL!,
    }

    this.baseUrl =
      this.config.environment === 'sandbox'
        ? 'https://sandbox.safaricom.co.ke'
        : 'https://api.safaricom.co.ke'
  }

  /**
   * Get OAuth access token from Daraja API
   */
  async getAccessToken(): Promise<string> {
    const auth = Buffer.from(
      `${this.config.consumerKey}:${this.config.consumerSecret}`
    ).toString('base64')

    try {
      const response = await axios.get(
        `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      )

      return response.data.access_token
    } catch (error) {
      console.error('Error getting M-Pesa access token:', error)
      throw new Error('Failed to get M-Pesa access token')
    }
  }

  /**
   * Initiate STK Push request
   */
  async initiateSTKPush(request: STKPushRequest): Promise<STKPushResponse> {
    const accessToken = await this.getAccessToken()
    const timestamp = this.generateTimestamp()
    const password = this.generatePassword(timestamp)

    // Format phone number (remove leading 0 if present, ensure 254 format)
    const phoneNumber = this.formatPhoneNumber(request.phoneNumber)

    const payload = {
      BusinessShortCode: this.config.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.floor(request.amount), // M-Pesa requires integer
      PartyA: phoneNumber,
      PartyB: this.config.businessShortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: this.config.callbackUrl,
      AccountReference: request.accountReference,
      TransactionDesc: request.transactionDesc,
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error: any) {
      console.error('Error initiating STK push:', error.response?.data || error)
      throw new Error(
        error.response?.data?.errorMessage || 'Failed to initiate M-Pesa payment'
      )
    }
  }

  /**
   * Query STK Push transaction status
   */
  async querySTKPushStatus(checkoutRequestId: string): Promise<any> {
    const accessToken = await this.getAccessToken()
    const timestamp = this.generateTimestamp()
    const password = this.generatePassword(timestamp)

    const payload = {
      BusinessShortCode: this.config.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpushquery/v1/query`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return response.data
    } catch (error) {
      console.error('Error querying STK push status:', error)
      throw new Error('Failed to query payment status')
    }
  }

  /**
   * Generate timestamp in the format required by M-Pesa
   */
  private generateTimestamp(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const second = String(now.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}${hour}${minute}${second}`
  }

  /**
   * Generate password for STK Push
   */
  private generatePassword(timestamp: string): string {
    const data = `${this.config.businessShortCode}${this.config.passkey}${timestamp}`
    return Buffer.from(data).toString('base64')
  }

  /**
   * Format phone number to 254XXXXXXXXX format
   */
  private formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '')

    // Remove leading 0 if present
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1)
    }

    // Add country code if not present
    if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned
    }

    return cleaned
  }

  /**
   * Validate M-Pesa callback signature (if Safaricom provides one)
   */
  validateCallback(data: any): boolean {
    // Safaricom doesn't currently provide signatures for callbacks
    // In production, you should verify the source IP or use other security measures
    return true
  }
}

export const mpesaService = new MpesaService()
