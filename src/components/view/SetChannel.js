import React from 'react'

function SetChannel(buttonName, modalShow) {
    return (
        <>
            <div className="row">
                <div
                    className="col-md-10 card-body cardColumn"
                >
                    <div className="text-white">
                        <h6 style={{ marginTop: "-8px" }} className="">
                            {buttonName}
                        </h6>
                    </div>
                </div>
                <div className="col-md-2">

                </div>
            </div>
        </>
    )
}

export default SetChannel