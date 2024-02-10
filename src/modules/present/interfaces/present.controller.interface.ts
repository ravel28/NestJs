import { Response } from 'express';

export default interface PresentControllerInterface {
  presentUser(res: Response, uniqueIdUser: string): Promise<Response>;
}
