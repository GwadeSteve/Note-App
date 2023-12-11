import React from "react";
import { Link } from "react-router-dom";

const FormRight = ({page}) => {

    return (
        <div className="Right-Form">
          <h1>{page}</h1>
          {page === 'Login' ? (
            <form method="POST">
              {/* Your Login form elements */}
              <button type="submit">LOGIN</button>
              <p>Don't yet have an account ? <Link to="/register">Create an account</Link></p>
            </form>
          ) : (
            <form method="POST">
              {/* Your Registration form elements */}
              
              <button type="submit">LOGIN</button>
              <p>Already have an account ? <Link to="/login">Login Instead</Link></p>
            </form>
          )}
        </div>
      );
}

export default FormRight;