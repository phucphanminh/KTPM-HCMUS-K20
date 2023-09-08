import { User } from "../../appData/user/User";
import useCustomNavigation from './../../hooks/useCustomNavigation/index';
import { useDispatch } from 'react-redux';
import { showMessage } from './../../redux/reducers';
import { StatusColor } from "../../component/Overlay/SlideMessage";

// Define an interface for the handler
interface Handler {
    setNext(handler: Handler): Handler;
    handle(): boolean;
}

// Create an abstract base class for handlers
abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(): boolean {
        if (this.nextHandler) {
            return this.nextHandler.handle(); // Pass the request to the next handler
        }
        return true; // Return true if there's no next handler
    }
}

// Create a handler for login check
export class LoginHandler extends AbstractHandler {
	public handle(): boolean {
		// Check if the user is logged in using your authentication logic
		
        if (!User.isUserLogin()) {
            return false;
        }
        
        // Continue to the next handler
        return super.handle();
    }
}
