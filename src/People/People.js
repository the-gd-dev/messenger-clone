import React from 'react'
import './People.css';
import Person from './Person';
import FlipMove from 'react-flip-move';

const People = ({ sidebarwidth, setSidebar,people }) => {
    return (
        <div id="people__wrapper" className={sidebarwidth === '' ? 'col-sm-12 col-md-3 px-0' : sidebarwidth}>
            <section id="people">
                {
                    people.length > 0 ?
                    <ul className="list-group">
                        <FlipMove>
                            {
                                people.map(person => <Person key={person.id} sidebaropen={sidebarwidth === ''} person={person} />)
                            }
                        </FlipMove>
                    </ul> 
                    :
                    <div className="text-center py-5">
                        <div className="spinner-border" style={{width:'1.5rem',height:'1.5rem'}}  role="status">
                            <span className="sr-only">Loading...</span>
                        </div> 
                        <span className="h5"> looking for participents ....</span>
                        
                    </div>
                }
               
            </section>
        </div>
    );
}

export default People;