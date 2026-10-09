# Task Management API

A REST API for creating and managing tasks. The backend runs locally at `http://localhost:4000`. Task endpoints use the `/api/tasks` prefix.

## API Reference

### Get all tasks

```http
GET /api/tasks
```

Returns `200` with an array of tasks.

### Get a task

```http
GET /api/tasks/{id}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | Required. ID of the task |

Returns `200` with the task, or `404` if it does not exist.

### Create a task

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Prepare report",
  "description": "Collect the latest figures",
  "status": "pending",
  "priority": "medium",
  "dueDate": null
}
```

All fields are optional. Valid statuses: `pending`, `in_progress`, `completed`. Valid priorities: `low`, `medium`, `high`. Returns `201` with the created task.

### Update a task

```http
PUT /api/tasks/{id}
Content-Type: application/json
```

Accepts any subset of `title`, `description`, `status`, `priority`, and `dueDate`. Returns `200` with the updated task, or `404` if it does not exist.

### Delete a task

```http
DELETE /api/tasks/{id}
```

Returns `200` with `{"success": true}`, or `404` if it does not exist.

## Notes

No API key or authentication is required. Tasks are stored in memory and are cleared when the backend restarts. The frontend currently uses a deployed API URL configured in `frontend/src/utils.js`.