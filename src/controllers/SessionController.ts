import { Response, Request } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const authenticateUser = new AuthenticateUserService();

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      return res.json({ user, token });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default SessionController;
