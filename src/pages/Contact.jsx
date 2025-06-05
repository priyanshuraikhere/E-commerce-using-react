import { useState, useRef } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Comment,
} from "@mui/icons-material";
import emailjs from "@emailjs/browser";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
  });

  const form = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_rv8tea3",
        "template_27kvobm",
        form.current,
        "R0LLzW58YqAY4zOfq"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          toast.success("Message sent successfully!");
          setFormData({ fullName: "", email: "", mobile: "", message: "" });
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message, please try again.");
        }
      );
  };

  return (
    <>
      <Box>
        <Typography variant="h4" align="center" sx={{ mt: 10 }}>
          CONTACT US
        </Typography>

        <Typography
          align="center"
          sx={{ mt: 4, fontSize: "20px", color: "gray" }}
        >
          For any order related query, please reach out to us on 6266350425,
          Monday - Saturday (except 2nd & 4th Saturday) from 9:30am - 6:30pm Or
          you can drop us an email on infoKoders.com
        </Typography>

        <Typography
          veriant="h4"
          align="center"
          sx={{ mt: 4, fontSize: "20px", color: "gray" }}
        >
          our customer service representative will get back to you as soon as
          possible. For career inquiries, mail us on infoKoders.com
        </Typography>

        <Typography
          veriant="h4"
          align="center"
          sx={{ mt: 4, mb: 10, fontSize: "20px", color: "gray" }}
        >
          For partner/business inquiries, submit your enquiry here or mail us on
          infoKoders.com
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 5,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "40%",
            margin: "auto",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: 6,
            p: 4,
            mb: 10,
          }}
        >
          <Typography variant="h4" align="center" color="#131e36">
            Contact Us
          </Typography>

          <Box
            component="form"
            ref={form}
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={sendEmail}
          >
            <TextField
              label="Full Name"
              name="fullName"
              variant="outlined"             
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: <Person />,
                },
              }}
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: <Email />,
                },
              }}
            />
            <TextField
              label="Contact No"
              name="mobile"
              type="tel"
              variant="outlined"
              fullWidth
              value={formData.mobile}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: <Phone />,
                },
              }}
            />

            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={formData.message}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: <Comment />,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#131e36",
                color: "#fff",
                fontSize: "17px",
                fontWeight: "700",
                "&:hover": { backgroundColor: "rgb(21, 39, 76)" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            height: "440px",
            width: "40%",
            margin: "auto",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: 6,
            padding:5,
            mb: 10,
          }}
        >
          <Typography variant="h4" align="center" color="#131e36">
            Contact Details
          </Typography>
          <Box sx={{padding:"70px"}}> 

          <Typography  color="#131e36" sx={{fontSize:"20px" , mt:4  , textAlign:"left"}}>
            <PlaceIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            213, Satguru Parinay Opp. C21 mall, AB Rd Indore, MP 452001, IN
          </Typography>

         <Typography color="#131e36" sx={{ fontSize:"20px"  , mt:4 , textAlign:"left" }}>
            <Phone  sx={{ verticalAlign: "middle", mr: 1 }} />
            +91 6266350425
          </Typography>

          <Typography sx={{mt:4}}>

          <Link href="https://www.linkedin.com/in/priyanshu-raikhere-235226253/" target="_blank"  color="#131e36"  style={{textDecoration:"none"  ,fontSize:"20px" , textAlign:"left" }} >

          <LinkedInIcon sx={{ verticalAlign: "middle"  }}/>  Priyanshu raikhere
          </Link>
          </Typography>


          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 400,
          // borderRadius: "10px",
          overflow: "hidden",
          mb: 6,
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7359.145059847539!2d75.89173919999999!3d22.744124600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd4f60e2476d%3A0xda822cee3e05d2ec!2sInfoKoders%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1748957135964!5m2!1sen!2sin"
          width="100%"
          height="400"
          // style={{ borderRadius: "10px" }}
          allowFullScreen
          loading="lazy"
        />
      </Box>
    </>
  );
};

export default Contact;
