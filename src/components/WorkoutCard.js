import { Card, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function WorkoutCard({workout}) {

	const { _id, name, description, status} = workout;
    const navigate = useNavigate();

    function updateWorkoutStatus(id) {

            fetch(`http://localhost:4000/workouts/${id}`,{

            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if (data.error === "Error in Saving") {

                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful Workout Update",
                    text: data.message

                })

            } else {

                Swal.fire({

                    icon:"success",
                    title: "Workout Updated"

                })

                window.location.reload() 
            }

        })
    }

    function deleteWorkout(id) {

            fetch(`http://localhost:4000/workouts/${id}`,{

            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if (data.error === "Error in Saving") {

                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful Workout Deletion",
                    text: data.message

                })

            } else {

                Swal.fire({

                    icon:"success",
                    title: "Workout Deleted"

                })

                window.location.reload() 
            }

        })
    }

	return (
		<Card className="mt-3">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Status:</Card.Subtitle>
                <Card.Text>{status}</Card.Text>		        
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
                <button className="btn btn-primary btn-sm" onClick={() => updateWorkoutStatus(_id)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteWorkout(_id)}>Delete</button>
            </Card.Footer>
        </Card>
		)
}
