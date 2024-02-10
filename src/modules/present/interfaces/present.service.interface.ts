import { PresentUserDto } from '../dtos/present-user.dto';

export default interface PresentServiceInterface {
  presentUser(uniqueIdUser: string): Promise<PresentUserDto>;
}
