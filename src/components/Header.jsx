// import React from 'react';
// import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
// import { FaUser, FaBell, FaEnvelope, FaHeart, FaSearch } from 'react-icons/fa';
// const username = localStorage.getItem('username');

// const Header = () => {
//   return (
//     <header className="bg-white shadow-sm">
//       <Navbar bg="white" expand="md" className="px-3">
//         <Container fluid className="d-flex align-items-center justify-content-space-between">
//           {/* Logo */}
//           <Navbar.Brand href="/" className="d-flex align-items-center me-5">
//             <img src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733152278/dashme-logo_asszym.png" alt="" />
//           </Navbar.Brand>

//           {/* Toggle for Mobile */}
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />


//           {/* Search Bar */}
//           <Form className="d-flex mx-auto my-3 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
//             <div className="input-group">
//               <FormControl type="search" placeholder="Search for items" aria-label="Search" className="rounded-start" style={{ border: '1px solid green', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px', }} />
//               <Button variant="outline-success" className="rounded-end" style={{ backgroundColor: 'green', color: 'white', borderTopRightRadius: '25px', borderBottomRightRadius: '25px', border: '1px solid green', }} >
//                 <FaSearch />
//               </Button>
//             </div>
//           </Form>

//           {/* Navbar Links */}
//           <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//             {/* Icons and Links */}
//             <Nav className="d-flex flex-row align-items-center justify-content-space-between">
//               {/* <Nav.Link href="/messages" className="me-3">
//                 <FaEnvelope size={30} />
//               </Nav.Link> */}
//               <Nav.Link href="/notifications" className="me-3">
//                 <FaBell size={30} />
//               </Nav.Link>
//               <Nav.Link href="/favorites" className="me-3">
//                 <FaHeart size={30} />
//               </Nav.Link>
//               {/* <Nav.Link href="/profile" className="me-5">
//                 <FaUser size={30} />
//               </Nav.Link> */}
//               <Nav.Link href="/profile" className="me-5 d-flex align-items-center">
//                 <FaUser size={30} />
//                 {username && <span className="ms-2">{username}</span>}
//               </Nav.Link>

//               <Nav.Link href="/upload" className="me-4 fs-6  text-dark">
//                 Upload
//               </Nav.Link>
//               <Nav.Link href="/register" className="me-3 fs-6  text-dark">
//                 Sign Up
//               </Nav.Link>
//               <Nav.Link href="/language" className="fs-6  text-dark">
//                 EN <span className="fw-light">&#x25BC;</span>
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;


import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaBell, FaEnvelope, FaHeart, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await axios.get('https://dashmeafrica-backend.vercel.app/api/userProfile/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsername(data.username); // Assumes "username" is a field in the response
        } catch (error) {
          console.error('Error fetching user data:', error.response?.data.message || error.message);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <Navbar bg="white" expand="md" className="px-3">
        <Container fluid className="d-flex align-items-center justify-content-space-between">
          {/* Logo */}
          <Navbar.Brand href="/" className="d-flex align-items-center me-5">
            <img src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733152278/dashme-logo_asszym.png" alt="" />
          </Navbar.Brand>

          {/* Toggle for Mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Search Bar */}
          <Form className="d-flex mx-auto my-3 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="input-group">
              <FormControl
                type="search"
                placeholder="Search for items"
                aria-label="Search"
                className="rounded-start"
                style={{
                  border: '1px solid green',
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '25px',
                }}
              />
              <Button
                variant="outline-success"
                className="rounded-end"
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px',
                  border: '1px solid green',
                }}
              >
                <FaSearch />
              </Button>
            </div>
          </Form>

          {/* Navbar Links */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="d-flex flex-row align-items-center justify-content-space-between">
              <Nav.Link href="/notifications" className="me-3">
                <FaBell size={30} />
              </Nav.Link>
              <Nav.Link href="/favorites" className="me-3">
                <FaHeart size={30} />
              </Nav.Link>
              <Nav.Link href="/profile" className="me-5 d-flex align-items-center">
                <FaUser size={30} className="me-2" />
                {username ? <span>{username}</span> : <span>Loading...</span>}
              </Nav.Link>
              <Nav.Link href="/upload" className="me-4 fs-6 text-dark">
                Upload
              </Nav.Link>
              <Nav.Link href="/register" className="me-3 fs-6 text-dark">
                Sign Up
              </Nav.Link>
              <Nav.Link href="/language" className="fs-6 text-dark">
                EN <span className="fw-light">&#x25BC;</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
