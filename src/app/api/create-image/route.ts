import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { positive_prompt, negative_prompt, seed, steps, width, height } = await req.json();

    const payload = {
      positive_prompt,
      negative_prompt: negative_prompt || "",
      seed: seed || 18446744073709552000,
      steps: steps || 10,
      width: width || 256,
      height: height || 256,
    };

    console.log('Sending payload:', payload);

    const response = await fetch("http://122.160.116.97:8081/generate_image/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Received response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to generate image:', errorText);
      throw new Error('Failed to generate image');
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.error();
  }
};
