import { PersonType } from "./person.interface.ts";

export class Person {
  personData: PersonType;

  isUnprocessable = 422;
  isBadRequest = 400;
  isOk = 200;

  constructor(personData: PersonType) {
    this.personData = personData;
  }

  setStatusBasedOnValidity() {
    const statuses = [
      this.#validateNickname(),
      this.#validateName(),
      this.#validateBirth(),
      this.#validateStack(),
    ];

    return statuses.reduce((acc, status) => {
      if (status > 299) acc = status;
      return acc;
    }, 200) as 200 | 400 | 422;
  }

  #validateNickname() {
    return this.#baseValidator("apelido", 32);
  }

  #validateName() {
    return this.#baseValidator("nome", 100);
  }

  #validateBirth() {
    const validate = this.#baseValidator("nascimento", 10);
    if (validate !== this.isOk) return validate;

    const { nascimento } = this.personData;
    const yearMaskRegEx = /^\d{4}-\d{2}-\d{2}$/;
    const matchesMask = nascimento.match(yearMaskRegEx);
    const isAnActualDate = new Date(nascimento).getDate();
    if (!matchesMask || !isAnActualDate) return this.isBadRequest;

    return this.isOk;
  }

  #validateStack() {
    const stack = this.personData.stack;
    if (!stack) return this.isOk;

    const isAnArrayWithLength = Array.isArray(stack) && !!stack.length;
    if (!isAnArrayWithLength) return this.isUnprocessable;

    const everyItemIsAStringWithMaxiumLengthOf32 = stack.every((item) => {
      const isString = this.#checkIfIsString(item);
      const hasAdequatedLength = this.#checkLength(item, 32);

      return isString === this.isOk && hasAdequatedLength === this.isOk;
    });
    if (!everyItemIsAStringWithMaxiumLengthOf32) return this.isBadRequest;

    return this.isOk;
  }

  #baseValidator(key: keyof PersonType, adequatedLength: number) {
    const value = this.#checkIfExists(key);
    if (value === this.isUnprocessable) return value;

    const hasAdequatedLength = this.#checkLength(
      value as string,
      adequatedLength
    );
    if (hasAdequatedLength !== this.isOk) return hasAdequatedLength;

    const isString = this.#checkIfIsString(value as string);
    if (isString !== this.isOk) return isString;

    return this.isOk;
  }

  #checkIfExists(key: keyof PersonType) {
    const value = this.personData[key];
    if (!value) return this.isUnprocessable;
    return value as string;
  }

  #checkLength(value: string, adequatedLength = 32) {
    const hasAdequatedLength = value.length <= adequatedLength;
    if (!hasAdequatedLength) return this.isBadRequest;
    return this.isOk;
  }

  #checkIfIsString(value: string) {
    const isString = typeof value === "string";
    if (!isString) return this.isBadRequest;
    return this.isOk;
  }
}
