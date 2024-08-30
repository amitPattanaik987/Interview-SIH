"use client"
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";

function RecordAnswerSection({interviewQuestion, activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (results.length > 0) {
      const newAnswer = results.map(result => result.transcript).join(' ');
      setUserAnswer(prevAnswer => prevAnswer + ' ' + newAnswer);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
    
  }, [userAnswer]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();

    } else {
      startSpeechToText();
    }
  };

  const saveUserAnswer = async () => {
    const feedbackPrompt = `Question: ${interviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depends on questions and user answer for given interview question, please give us rating for answer and feedback for areas of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = (await result.response.text())
      .replace("```json", "")
      .replace("```", "")
      .trim();
    const jsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: interviewQuestion[activeQuestionIndex]?.question,
      correctAns: interviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: jsonFeedbackResp?.feedback,
      rating: jsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    });

    if (resp) {
      toast('User Answer Recorded Successfully');
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  const updateUserAnswer = async () => {
    setLoading(true);
    await saveUserAnswer();
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5 my-20">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={startStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
