import TK1 from '~/components/TK1';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TK2 from '~/components/TK2';
import TK3 from '~/components/TK3';
import TK4 from '~/components/TK4';
function Home() {
    return (
        <Row className="justify-content-between px-5">
            <Col>
                <TK3 />
            </Col>
            <Col>
                <TK1 />
            </Col>

            <Col>
                <TK2 />
            </Col>
            <TK4 />
        </Row>
    );
}

export default Home;
