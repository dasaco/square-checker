import React, { Component } from 'react';

import FileItem from './fileItem/fileItem';
import FileInput from './fileInput/fileInput';

class FileList extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>Filename</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{this.props.files.map((file, i) =>
							<FileItem onDeleteFileClicked={this.props.onDeleteFileClicked} onLoadFromFileClicked={this.props.onLoadFromFileClicked} key={i} index={i} file={file} />
			      )}
					</tbody>
				</table>
				<hr />
				<FileInput onFileRefreshClicked={this.props.onFileRefreshClicked} onFileSaveClicked={this.props.onFileSaveClicked} />
	    </div>
		)
	}
}

export default FileList;
