import React from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from '../fireBase/config'
import { addDocument, generateKeywords } from '../fireBase/service'
const { Title } = Typography

const FbProvider = new FacebookAuthProvider();

function Login() {

    const handleFbLogin = async () => {

        const data = await signInWithPopup(auth, FbProvider)

        const { user, providerId } = data

        addDocument("users", user.uid, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: providerId,
            keywords: generateKeywords(user.displayName)
            // createdAt: user.metadata.creationTime
        })

        // .then((result) => {
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     const credential = FacebookAuthProvider.credentialFromResult(result);
        //     const token = credential.accessToken;
        //     // The signed-in user info.
        //     const user = result.user;
        //     // console.log(user);
        //     // ...
        // }).catch((error) => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.email;
        //     console.log(email)
        //     // The AuthCredential type that was used.
        //     const credential = FacebookAuthProvider.credentialFromError(error);
        //     // ...
        // });

    }


    return (
        <Row justify="center" style={{ height: '800px' }}>
            <Col span={8}>
                <Title style={{ textAlign: 'center' }}>Fun chat</Title>
                <Button style={{ width: '100%', marginBottom: 5 }}>
                    Đăng nhập bằng google
                </Button>
                <Button
                    style={{ width: '100%' }}
                    onClick={handleFbLogin}
                >
                    Đăng nhập bằng facebook
                </Button>
            </Col>
        </Row>
    )
}

export default Login