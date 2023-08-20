import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdatePriority() {
  const fetcher = useFetcher();
  return (
    <div>
      <fetcher.Form method="PATCH">
        <Button type="small">Make Priority</Button>
      </fetcher.Form>
    </div>
  );
}
export async function action({ request, params }) {
  const data = { priority: true };
  console.log(params.orderId);
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdatePriority;
