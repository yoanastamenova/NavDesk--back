import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../database/models/User';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email.trim() || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email and password cannot be empty!"
            });
        }

        if (password.length < 8 || password.length > 12) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password must be between 8 and 12 characters."
                }
            )
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create(
            {
                email: email,
                password: hashedPassword
            }
        ).save()

        res.status(201).json(
            {
                success: true,
                message: "You registered successfully! Welcome!",
                data: newUser
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error registering user!",
                error: error
            }
        )
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password cannot be empty!"
        });
    }

    try {
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with this email address!"
            });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password!"
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "3h" }
        );

        res.json({
            success: true,
            message: "Logged in successfully! Welcome!",
            token: token
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: `Cannot log in due to server error`
        });
    }
}