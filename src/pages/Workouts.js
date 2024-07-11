import { useEffect, useState, useContext } from "react";
import WorkoutCard from "../components/WorkoutCard";
import UserContext from "../UserContext";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Workouts() {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/workouts/getMyWorkouts/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.workouts !== null) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts([]);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {user ? (
        workouts.length > 0 ? (
          <>
            <h1 className="text-center mt-5">workouts</h1>
            <Row>
              {workouts.map((game) => {
                return (
                  <Col md={3} key={game._id}>
                    <WorkoutCard game={game} key={game._id} />
                  </Col>
                );
              })}
            </Row>
          </>
        ) : (
          <>
            <h1>No Workouts</h1>
          </>
        )
      ) : (
        <>
          <h1>You are not logged in</h1>
          <Link className="btn btn-primary" to={"/login"}>
            Login to View
          </Link>
        </>
      )}
    </>
  );
}
