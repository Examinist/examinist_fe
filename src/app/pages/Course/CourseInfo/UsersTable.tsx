import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import IUser from "../../../types/User";

interface IUsersList {
  users: IUser[];
}

export default function UsersTable({ users }: IUsersList) {
  return (
    <TableContainer>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ mt: 0, pt: 0 }}>Name</TableCell>
            <TableCell align="left" sx={{ pt: 0 }}>
              username
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 &&
            users.map((user) => (
              <TableRow
                key={user.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${user.first_name} ${user.last_name}`}
                </TableCell>
                <TableCell align="left">{user.username}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {users.length === 0 && <Box sx={{ py: 3 }}>No users to show.</Box>}
    </TableContainer>
  );
}
