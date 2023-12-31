export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESS': return 200;
    case 'CREATED': return 201;
    case 'BAD REQUEST': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    default: return 500;
  }
}
