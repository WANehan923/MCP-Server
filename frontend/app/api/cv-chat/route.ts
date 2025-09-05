import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    
    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Get MCP server URL from environment
    const mcpServerUrl = process.env.MCP_SERVER_URL || process.env.NEXT_PUBLIC_MCP_SERVER_URL;
    
    if (!mcpServerUrl) {
      return NextResponse.json(
        { error: 'MCP server URL not configured' },
        { status: 500 }
      );
    }

    // Call MCP server
    const response = await fetch(`${mcpServerUrl}/api/cv-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`MCP server responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('CV Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process CV chat request' },
      { status: 500 }
    );
  }
}