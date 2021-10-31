export class Validator {
  properties: Array<string>; // expected properties from JSON response
  propertiesAuto: Array<string>; // primitive properties to auto-inject
  name: string; // object name

  constructor(name: string, properties: Array<string>, propertiesAuto: Array<string>) {
    this.properties = properties;
    this.propertiesAuto = propertiesAuto;
    this.name = name;
  }
}

export abstract class ActiveModel {

  constructor(objectJSON: any, validator: Validator) {
    if (objectJSON) {
      const responseKeys = Object.keys(objectJSON);

      for (const key of responseKeys) {
        // Check if server send extra info
        if (validator.properties.includes(key)) {
          if (validator.propertiesAuto.includes(key)) {
            this[key] = objectJSON[key];
          }
        } else {
          console.warn(`Extra data in response: '${key}' not recognized for model '${validator.name}'`);
        }
      }

      // Check if server send less info
      for (const key of validator.properties) {
        if (!responseKeys.includes(key)) {
          console.warn(`Missing data in response: '${key}' expected for model '${validator.name}'`);
        }
      }
    }
  }

  static getDateWithoutHours(date: Date, timezone: boolean): Date {
    if (!date) {
      return null;
    }
    const newDate = date;
    newDate.setHours(0, 0, 0, 0);
    if (timezone) {
      newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60);
    }

    return newDate;
  }

  static getDate(date: Date, timezone: boolean): Date {
    if (!date) {
      return null;
    }
    const newDate = date;
    if (timezone) {
      newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60);
    }

    return newDate;
  }

  static getDateWithoutHoursEndDay(date: Date, timezone: boolean): Date {
    if (!date) {
      return null;
    }
    const newDate = date;
    newDate.setHours(23, 59, 59, 0);
    if (timezone) {
      newDate.setHours(newDate.getHours() - newDate.getTimezoneOffset() / 60);
    }

    return newDate;
  }

  static getDateAsStringInMilliseconds(date: Date): string {
    if (!date) {
      return null;
    }
    const newDate = this.getDate(date, false);
    return newDate.getTime().toString();
  }

  static getDateWithoutHoursAsStringInMilliseconds(date: Date): string {
    if (!date) {
      return null;
    }
    const newDate = this.getDateWithoutHours(date, false);
    return newDate.getTime().toString();
  }

  static getDateWithoutHoursEndDayAsStringInMilliseconds(date: Date): string {
    if (!date) {
      return null;
    }
    const newDate = this.getDateWithoutHoursEndDay(date, false);
    return newDate.getTime().toString();
  }
}
