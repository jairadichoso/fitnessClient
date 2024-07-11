import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <Row>
            <Col className="mt-5 pt-5 text-center mx-auto">
                <h1>Welcome to Fitness Tracker App</h1>
                <p>Create, Read, Update and Delete Workouts</p>
                <Link className="btn btn-primary" to={"/workouts"}>Check your workouts</Link>
            </Col>
        </Row>
    )
}