import * as React from "react";
import Layout from "../../components/Layout";
import lang from "../../language.json";
import State from "../../interfaces/State";
import Department from "../../interfaces/Department";
import { connect } from "react-redux";
import { createOfficer, getDepartments } from "../../lib/actions/officer";
import AlertMessage from "../../components/alert-message";

interface Props {
  error: string;
  departments: Department[];
  createOfficer: (data: object) => void;
  getDepartments: (type: "admin" | "leo") => void;
}

const CreateOfficerPage: React.FC<Props> = ({
  error,
  departments,
  createOfficer,
  getDepartments,
}) => {
  const [officerName, setOfficerName] = React.useState<string>("");
  const [officerDept, setOfficerDept] = React.useState<string>("");

  React.useEffect(() => {
    getDepartments("leo");
  }, [getDepartments]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    createOfficer({
      name: officerName,
      department: officerDept,
    });
  }

  return (
    <Layout classes="mt-5">
      <form onSubmit={onSubmit}>
        {error ? <AlertMessage message={error} type="warning" /> : null}
        <div className="form-group">
          <label htmlFor="officerName">{lang.record.officer_name}</label>
          <input
            className="form-control bg-secondary border-secondary text-light"
            type="text"
            id="officerName"
            value={officerName}
            onChange={(e) => setOfficerName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="officerDept">{lang.officers.select_department}</label>
          <select
            className="form-control bg-secondary border-secondary text-light"
            name="department"
            id="department"
            value={officerDept}
            onChange={(e) => setOfficerDept(e.target.value)}
          >
            <option>{lang.officers.select_department}..</option>
            {!departments[0] ? (
              <option>{lang.officers.no_departments}</option>
            ) : (
              departments.map((department, idx) => {
                return (
                  <option key={idx} id={`${idx}`} value={department.name}>
                    {department.name}
                  </option>
                );
              })
            )}
          </select>
        </div>
        <div className="form-group float-right">
          <a className="btn btn-danger" href="/leo/my-officers">
            {lang.global.cancel}
          </a>
          <button type="submit" className="btn btn-primary ml-2">
            {lang.officers.create_officer}
          </button>
        </div>
      </form>
    </Layout>
  );
};

const mapToProps = (state: State) => ({
  departments: state.officers.departments,
  error: state.officers.error,
});

export default connect(mapToProps, { createOfficer, getDepartments })(CreateOfficerPage);
