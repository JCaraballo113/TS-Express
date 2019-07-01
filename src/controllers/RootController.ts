import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    } else {
        res.status(403).send('Not Permitted');
    }
}

@controller('')
class RootController {
    @get('/')
    index(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <div>You are logged in</div>
                    <a href="/auth/logout">Log Out</a>
                </div>
            `);
        } else {
            res.send(`
                <div>
                    <div>You are not logged in</div>
                    <a href="/auth/login">Log In</a>
                </div>
            `);
        }
    }

    @use(requireAuth)
    protected(req: Request, res: Response) {
        res.send('Welcome to the protected route');
    }
}
