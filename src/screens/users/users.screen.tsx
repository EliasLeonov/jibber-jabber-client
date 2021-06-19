import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useAppDispatch, useUsersSelector } from "../../storage/app.selectors";
import { search } from "../../storage/users.reducer";
import LoadingScreen from "../loading.screen";
import UsersList from "./users.list";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
  },
  postButton: { marginRight: 15 },
  postText: { flex: 1 },
}));

const UsersScreen = () => {
  const styles = useStyles();
  const [value, setValue] = useState("");
  const { loading } = useUsersSelector((state) => state.searchRequestStatus);
  const users: any[] = useUsersSelector((state) => state.users);

  const dispatch = useAppDispatch();

  return (
    <Container>
      <Container>
        <Button
          variant="outlined"
          color="primary"
          className={styles.postButton}
          onClick={async () => {
            if (value.length == 0) {
              return;
            }
            await dispatch(search({ username: value }));
            setValue("");
          }}
        >
          Search
        </Button>
        <TextField
          className={styles.postText}
          multiline
          rowsMax={4}
          value={value}
          placeholder={"username"}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
        />
      </Container>
      {loading ? <LoadingScreen /> : <UsersList users={users} />}
    </Container>
  );
};

export default UsersScreen;
