interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public execute({ id, name, email, password }: IRequest): Promise<void> {}
}

export default UpdateUserService;
