import { Container } from "@material-ui/core";
import React from "react";
import UserComponent from "./user.component";

const UsersList = (props) => {
  const { users } = props;

  return (
    <Container>
      {users.length > 0 ? (
        users.map((x) => <UserComponent {...x} key={x.id} />)
      ) : (
        <EmptyComponent />
      )}
    </Container>
  );
};

const EmptyComponent = (props) => {
  return (
    <Container>
      <label>No users</label>
    </Container>
  );
};

export default UsersList;
