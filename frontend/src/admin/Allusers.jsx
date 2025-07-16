import { useEffect, useState, useContext } from "react";
import {
  Container,
  Card,
  Typography,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../context/userContext";
const Allusers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.firstName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Card elevation={6} sx={{ padding: 4, mt: 5, mb: 5 }}>
        <Typography variant="h4" align="center" mb={4} gutterBottom>
          List of users
        </Typography>

        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ marginBottom: 3 }}
        />

        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Loading users...
            </Typography>
          </Box>
        ) : filteredUsers.length === 0 ? (
          <Typography align="center" sx={{ mt: 4 }}>
            No users found matching "<strong>{search}</strong>"
          </Typography>
        ) : (
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Profile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        src={`http://localhost:5000/uploads/${user.profileImage}`}
                        alt={user.firstName}
                      />

                      <Typography variant="body1" fontWeight="500">
                        {user.firstName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role || "User"}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={user.status}
                      color={user.status === "Active" ? "success" : "error"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default Allusers;
{
  /* <Typography
    variant="body2"
    fontWeight="bold"
    color={user.status === "Active" ? "green" : "red"}
    >
  {user.status}
</Typography> */
}
