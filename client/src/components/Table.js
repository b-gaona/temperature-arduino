import { Fragment } from "react";

function Table({ data, config, keyFn, loader }) {
  const renderedHeaders = config.map((col) => {
    if (col.header) {
      return <Fragment key={col.label}>{col.header()}</Fragment>;
    }
    return <th key={col.label}>{col.label}</th>;
  });

  const renderedRows = data.map((row, index) => {
    console.log(row);
    const renderedColumns = config.map((col) => {
      return (
        <td key={col.label} className="p-3">
          {col.render(row)}
        </td>
      );
    });

    return (
      <Fragment key={keyFn(row)}>
        <tr className="hover:bg-slate-100 cursor-pointer ease-in-out duration-300 text-center">
          {renderedColumns}
        </tr>
      </Fragment>
    );
  });

  const skeletons = loader ? (
    <tr>
      <td colSpan={12}>{loader}</td>
    </tr>
  ) : (
    ""
  );

  //If there are not rows in the table and there's not changing data
  const emptyRows = renderedRows.length === 0 && !loader && (
    <tr>
      <td colSpan={12} className="text-center py-5">
        No hay más registros por mostrar
      </td>
    </tr>
  );

  return (
    <table className="table-auto border-spacing-2 w-full">
      <thead>
        <tr className="border-b-2">{renderedHeaders}</tr>
      </thead>
      <tbody>
        {skeletons}
        {renderedRows}
        {emptyRows}
      </tbody>
    </table>
  );
}

export default Table;
