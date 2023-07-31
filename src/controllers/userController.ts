import { Response, Request } from "express";
import { UserModel } from "../models";

//GET all users
export const getUsers = async (req: Request, res: Response) => {
  const { user }: any = req.session;
  await UserModel.find({})
    .sort({ createAt: -1 })
    .then(async (users) => {
      if (!users) {
        res.send("No user created");
      }

      if (users) {
        const filteredUsers: any = [];
        users.forEach((item: any) => {
          const userInformation = {
            id: item._id,
            username: item.username,
            email: item.email,
            isAdmin: item.isAdmin,
          };
          filteredUsers.push(userInformation);
        });
        res.send(filteredUsers.filter((item: any) => item.id !== user.id));
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req?.body || null;
  await UserModel.findByIdAndDelete(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

export const getUser = async (req: Request, res: Response) => {
  res.send(req.session.user);
};
