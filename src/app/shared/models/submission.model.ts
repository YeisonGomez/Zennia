export class Submission {
	public source_code: any;
	public language_id: number;
	public stdin: string;
	public expected_output: string;
	public cpu_time_limit: number;
	public response: responseSubmission;
}

export class responseSubmission {
	public status: statusSubmission;
	public time: string;
	public message: string;
	public stdout: string;
}

export class statusSubmission {
	public id: number;
	public description: string;
}