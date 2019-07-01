import { Request, Response } from 'express';
import { get, controller, use, post } from './decorators';
import { bodyValidator } from './decorators/bodyValidator';

@controller('/auth')
class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(`
                <form method="POST">
                    <div>
                        <label>Email</label>
                        <input name="email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" type="password" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            `);
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;

        if (email === 'hi@hi.com' && password === 'password') {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.send('Invalid login credentials');
        }
    }

    @get('/logout')
    logout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect('/');
    }
}
