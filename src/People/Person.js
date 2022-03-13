import React, { forwardRef }  from 'react'
const Person = forwardRef((props,ref) => (
        <li ref={ref} className="list-group-item px-3">
            <div className="row">
                <div className={props.sidebaropen ? 'col-1' : 'col-12 text-center'}>
                    {
                        props.person.photoUrl ?
                        <img src={props.person.photoUrl} alt={props.person.name } className="userPhoto" /> : null
                    }
                </div>
                {
                    props.sidebaropen ? 
                    <div className="col-10">
                        <div className="h6 person-name">{props.person.name}</div>
                    </div> : null
                }
                
            </div>
            
        </li>
))
export default Person;