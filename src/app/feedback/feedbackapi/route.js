

let feedbackData = [];  

export async function GET() {
  
  return new Response(JSON.stringify(feedbackData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request) {
  
  const { name, feedback } = await request.json();


  if (!name && !feedback) {
    return new Response(JSON.stringify({ error: 'Name and feedback are required' }), { status: 400 });
  }

  
  const newFeedback = { name, feedback };
  feedbackData.push(newFeedback);

  
  return new Response(JSON.stringify(newFeedback), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
