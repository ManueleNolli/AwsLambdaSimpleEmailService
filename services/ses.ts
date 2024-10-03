import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'


const getAPIKey = (): string => {
  const api_key = process.env.SES_REGION

  if (api_key == undefined) throw new Error('SES API Key not found')

  return api_key
}

export const getSESClient = () => {
  return new SESClient({
    region: getAPIKey(),
  })
}

export const sendEmail = async (params: any) => {
  const ses = getSESClient()
  return await ses.send(new SendEmailCommand(params)) // this throws an error
}