import React from 'react';

const RunCard = ({fileName, problemName, status, msg}) => {

    return (
        <div>

           {/* returns fileName that is submitted*/}
           <h1>
               {fileName}
           </h1>

            {/*returns problem name*/}
            <h2>
                {problemName}
            </h2>

            {/*checks if status of run contains error*/}
            {status ="error" &&
                <h3>{msg}</h3>
            }

        </div>
    )
}
export default RunCard

