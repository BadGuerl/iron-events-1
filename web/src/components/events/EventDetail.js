import { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';

import eventsService from '../../services/events-service';

function EventDetail() {

  const params = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(); 

  /*
  Equivalencias entre componente funcional y de clase:

  - useEffect == componentDidMount
  - la función que devuelve useEffect == componentWillUnmount
  */
  useEffect(() => {
    // componentDidMount

    async function fetchEvent() {
      try {
        const { id } = params;
        console.info(`Feting event ${id}...`)
        const event = await eventsService.get(id)
        if (!isUnmounted) {
          // La promesa de 'eventsService.get' puede tardar mucho en resolverse y el usuario podría
          // decidir cambiar de ruta, debemos asegurarnos de que actualizamos el estado solo si el componente
          // sigue vivo.
          setEvent(event);
        }
      } catch (error) {
        if (!isUnmounted) {
          if (error.response?.status === 404) {
            history.push('/');
          } else {
            console.error(error);
          }
        }
      }
    }

    let isUnmounted = false;
    fetchEvent();

    return () => {
      // componentWillUnmount
      console.info(`Unmounting component...`);
      isUnmounted = true;
    }
  }, []); 
  // ^^ El segundo argumento representa el array de dependencias ([]), 
  // solo se volverá a ejecutar la función de useEffect cuando cambie el valor de una de sus dependecias 
  // (si está vacío solo se ejecutará una vez)

  if (!event) {
    return null;
  }

  const { image, title, description, tags, capacity, start, end } = event;
  return (
    <Fragment>
      <div className="row row-cols-1 mb-4">
        <div className="col text-center">
          <img src={image} alt={title} className="img-fluid" />
        </div>
        <div className="col">
          <h1 className="mt-4 mb-2">{title}</h1>
          <div className="d-flex flex-row mb-2">
            <span className="badge rounded-pill bg-info me-2 p-2"><i className="fa fa-users me-1"></i>0 / {capacity}</span>
            <span className="badge rounded-pill bg-danger me-2 p-2"><i className="fa fa-clock-o me-1"></i>{moment(start).format('llll')} to {moment(end).format('llll')}</span>
          </div>
          {description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {tags && (
          <div className="col">
            {tags.map(tag => <span key={tag}>{<span className="badge rounded-pill bg-secondary me-2">{tag}</span>}</span>)}
          </div>
        )}
      </div>
      <div className="row">
        <div className="col">
          <Link to="/events" className="fw-lighter"><i className="fa fa-angle-left"></i> Back to Events</Link>
        </div>
      </div>
    </Fragment>
  );
}

export default EventDetail;
