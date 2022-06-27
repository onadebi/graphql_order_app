import db from "../firebase";
import { Order } from "../models/order";
import { IPagingFilterInput } from "../interfaces/common/IPagingFilterInput";
import { User } from "../models/user";
import {IUserRegistration, IUserLogin } from "../interfaces/IUserRegistration";
import { ISuccessResponse } from "../interfaces/common/ISuccessResponse";
import { auth } from "firebase-admin";
import jwt from 'jsonwebtoken';
import { Encrypt } from "../middleware/auth.middleware";
import bcrypt from 'bcryptjs';
import appsettings from "../config/appsettings";

export class CustomerService {

    private readonly appDbRef = db.collection('orders_app');
    private readonly usersDbRef = db.collection('users');

    GetAllOrdersByCustomerEmail = async (email: string) => {
        let objResp: Order[] = [];
        try {
            const resp = await this.appDbRef.where('customer.email', '==', email).get();
            if (!resp.empty) {
                resp.forEach(doc => {
                    const order = doc.data() as Order;
                    order.uid = doc.id;
                    objResp.push(order)
                });
            }
        } catch (err: any) {
            console.log(`LOG ERROR: ${err.message}`)
        }
        return objResp;
    }

    GetAllUsers = async (filter: IPagingFilterInput) => {
        let objResp: User[] = [];
        try {

            const resp = await db.collection('users').get();
            if (!resp.empty) {
                resp.forEach(doc => {
                    const user = doc.data() as User;
                    user.uid = doc.id;
                    objResp.push(user)
                });
            }
        } catch (err: any) {
            console.log(`LOG ERROR: ${err.message}`)
        }
        return objResp;
    }

    GetAllAuthUsers = async (filter: IPagingFilterInput) => {
        let objResp: User[] = [];
        try {
            const resp = await auth().listUsers();
            if (resp.users) {
                resp.users.forEach(doc => {
                    const user: User = {
                        email: doc.email!,
                        name: doc.displayName ?? '',
                        phone: doc.phoneNumber ?? '',
                        uid: doc.uid

                    };
                    objResp.push(user)
                });
            }
        } catch (err: any) {
            console.log(`LOG ERROR: ${err.message}`)
        }
        return objResp;
    }

    RegisterNewUser = async (registration: IUserRegistration): Promise<ISuccessResponse> => {
        let objResp: ISuccessResponse = { success: false, message: '' };
        const { confirmPassword, email, name, password, phone } = registration;
        try {
            if (phone && email && password && name && confirmPassword) {
                if (password !== confirmPassword) {
                    objResp.message = "Password does not match";
                }
                const userResponse = await auth().createUser({
                    email,
                    password,
                    emailVerified: false,
                    disabled: false,
                    displayName: name,
                    phoneNumber: phone,
                });
                if (userResponse.uid) {
                    objResp.success = true;
                    objResp.message = JSON.stringify(userResponse);
                }
                registration.password = Encrypt(registration.password);
                registration.authId = userResponse.uid;
                const userLocal = await this.usersDbRef.add(registration);

            } else {
                objResp.message = "Invalid registration entry.";
            }
        } catch (ex: any) {
            console.log(`Exception is ${ex.message}`)
            objResp.message = ex.message;
        }
        return objResp;
    }

    SignInUser = async (user: IUserLogin): Promise<ISuccessResponse> => {
        let objResp: ISuccessResponse = { success: false, message: '' };//email:'', token:''};
        try {
            const userRecord = await auth().getUserByEmail(user.email);
            if (userRecord.email) {
                const userDoc = await this.usersDbRef.where('email', '==', userRecord.email).get();
                if (!userDoc.empty) {
                    let localPwd: { email: string, password: string } = { email: '', password: '' };
                    userDoc.docs.forEach(doc => localPwd = (doc.data() as { email: string, password: string }));
                    if (await bcrypt.compare(user.password, localPwd.password)) {
                        const token = jwt.sign({ email: user.email, authId: user.authId }, appsettings.authentication.secrete_key!, {
                            expiresIn: appsettings.authentication.tokenExpireDuration
                        });
                        objResp.success = true;
                        objResp.message = token;
                    }
                }
            }
        } catch (ex: any) {
            console.log(`Exception is ${ex.message}`)
            objResp.message = ex.message;
        }
        return objResp;
    }
}