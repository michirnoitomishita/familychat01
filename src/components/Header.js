import React, { useContext } from "react";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../provider/AuthProvider";
import dig from "object-dig";
import _ from "lodash";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const Header = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);

  // eslint-disable-next-line
  const buttonRender = () => {
    let buttonDom;
    if (_.get(currentUser, "currentUser")) {
      buttonDom = <button onClick={logOut}>ログアウト</button>;
    } else {
      buttonDom = <button onClick={signInWithGoogle}>ログイン</button>;
    }
    return buttonDom;
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>
          <b>富下家の父と娘のこうかん日記ぜよ</b>
        </Typography>
        {buttonRender()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
