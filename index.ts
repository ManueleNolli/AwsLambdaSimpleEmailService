import 'dotenv/config'

import {APIGatewayProxyEvent, Handler} from 'aws-lambda';
import {sendEmail} from "./services/ses";

const emailVerification = (email: string) => {
    const emailRegex = new RegExp(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/)
    return emailRegex.test(email)
}

const isSourceValid = (source: string) => {
    return emailVerification(source)
}

const isToValid = (to: string) => {
    return emailVerification(to)
}

const isSubjectValid = (subject: string) => {
    return subject.length > 0
}

const isMessageValid = (message: string) => {
    return message.length > 0
}

const validateFields = (body: string | null) => {
    if (!body) {
        throw new Error('Body is empty')
    }

    const {source, to, subject, message} = JSON.parse(body)

    if (!source || !to || !subject || !message) {
        throw new Error('Please fill all fields')
    }

    if (!isSourceValid(source)) {
        throw new Error('Invalid source email')
    }

    if (!isToValid(to)) {
        throw new Error('Invalid to email')
    }

    if (!isSubjectValid(subject)) {
        throw new Error('Invalid subject')
    }

    if (!isMessageValid(message)) {
        throw new Error('Invalid message')
    }

    return {source, to, subject, message}
}

export const handler: Handler = async (event: APIGatewayProxyEvent, context) => {
    let source, to, subject, message
    try {
        ({source, to, subject, message} = validateFields(event.body));
    } catch (error: any) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: error.message}),
        };
    }

    const emailParams = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Text: {
                    Data: message,
                },
            },
            Subject: {
                Data: subject,
            },
        },
        Source: source,
    }

    try {
        await sendEmail(emailParams)
        return {
            statusCode: 200,
            body: JSON.stringify({message: "Message Sent"}),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: "Error during sending message, please try again"}),
        };
    }
};
