import winston from "winston";
import {environment} from "../config/environment.server";

const {
  combine,
  timestamp,
  json,
  align,
  printf,
  cli
} = winston.format;

const logger = winston.createLogger({
  level: environment.LOG_LEVEL,
  defaultMeta: {
    service: 'handling-js-data'
  },
  transports: [
    new winston.transports.Console({
      format: combine(
        cli(),
        timestamp(),
        json(),
        align(),
        printf((info: { [key: string]: unknown }) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      )
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
      format: combine(
        timestamp(),
        json()
      )
    }),
    new winston.transports.File({
      filename: './logs/app-error.log',
      level: 'error',
      format: combine(
        timestamp(),
        json()
      )
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({filename: './logs/exception.log'})
  ],
  rejectionHandlers: [
    new winston.transports.File({filename: './logs/rejections.log'})
  ]
});

export default logger;
