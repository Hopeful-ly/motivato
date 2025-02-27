import { NextResponse } from "next/server";
import { sendDailyMotivation } from "@/lib/actions/notification";

// This route is designed to be called by a CRON job (e.g., once daily)
export async function GET(request: Request) {
  try {
    // Verify authorization if needed (from environment variable)
    const apiKey = request.headers.get("x-api-key");
    const validApiKey = process.env.CRON_API_KEY;

    if (validApiKey && apiKey !== validApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Send motivational message to all subscribers
    const result = await sendDailyMotivation();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send notifications" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Daily motivational notifications sent",
      stats: {
        total: result.total,
        sent: result.sent,
        failed: result.failed,
      },
    });
  } catch (error) {
    console.error("Error in daily motivation cron:", error);
    return NextResponse.json(
      { error: "Failed to process daily motivation" },
      { status: 500 }
    );
  }
}
