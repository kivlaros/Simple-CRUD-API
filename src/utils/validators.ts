import { validate as uuidValidate } from 'uuid';

export const isValidUUID = (id: string) => uuidValidate(id);
