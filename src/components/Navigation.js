import {Navbar, Container, Nav} from 'react-bootstrap'

const Navigation = ({onEntryFormClick}) => {
    return (
        <div style={{flex: '0 0 auto'}}>
            <Navbar bg="dark" variant = "dark" expand="md" sticky='top'>
            <Container>
                <Navbar.Brand href="#home">MapBench</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link onClick={console.log("click")}>Log in</Nav.Link>
                    <Nav.Link>Add a bench</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}

export default Navigation
