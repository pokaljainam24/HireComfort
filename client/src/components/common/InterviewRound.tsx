import React, { useState } from "react";
import "./InterviewRound.css";

export type InterviewRound = {
  id: string;
  name: string;
};

type InterviewRoundsProps = {
  rounds: InterviewRound[];

  // Number of rounds successfully passed
  roundsPassed: number;

  // Round number that was rejected.
  // Example:
  // rejectedRound={2} means Round 2 is rejected.
  rejectedRound?: number | null;

  onRoundsChange?: (rounds: InterviewRound[]) => void;

  onRoundsPassedChange?: (roundsPassed: number) => void;

  // Called when a round is rejected
  onRejectedRoundChange?: (
    rejectedRound: number | null
  ) => void;

  editable?: boolean;
};

const InterviewRounds: React.FC<InterviewRoundsProps> = ({
  rounds,
  roundsPassed,
  rejectedRound = null,

  onRoundsChange,
  onRoundsPassedChange,
  onRejectedRoundChange,

  editable = false,
}) => {
  const [newRoundName, setNewRoundName] = useState("");

  // =========================
  // ADD ROUND
  // =========================

  const addRound = () => {
    const name = newRoundName.trim();

    if (!name) return;

    const newRound: InterviewRound = {
      id: `${Date.now()}-${Math.random()}`,
      name,
    };

    onRoundsChange?.([...rounds, newRound]);

    setNewRoundName("");
  };

  // =========================
  // REMOVE ROUND
  // =========================

  const removeRound = (id: string) => {
    const updatedRounds = rounds.filter(
      (round) => round.id !== id
    );

    onRoundsChange?.(updatedRounds);

    // Make sure passed count does not exceed rounds
    if (roundsPassed > updatedRounds.length) {
      onRoundsPassedChange?.(
        updatedRounds.length
      );
    }

    // Clear rejected round if that round
    // no longer exists
    if (
      rejectedRound !== null &&
      rejectedRound > updatedRounds.length
    ) {
      onRejectedRoundChange?.(null);
    }
  };

  // =========================
  // RENAME ROUND
  // =========================

  const renameRound = (
    id: string,
    name: string
  ) => {
    onRoundsChange?.(
      rounds.map((round) =>
        round.id === id
          ? {
              ...round,
              name,
            }
          : round
      )
    );
  };

  // =========================
  // MOVE ROUND
  // =========================

  const moveRound = (
    index: number,
    direction: "left" | "right"
  ) => {
    const newIndex =
      direction === "left"
        ? index - 1
        : index + 1;

    if (
      newIndex < 0 ||
      newIndex >= rounds.length
    ) {
      return;
    }

    const updatedRounds = [...rounds];

    [updatedRounds[index], updatedRounds[newIndex]] =
      [
        updatedRounds[newIndex],
        updatedRounds[index],
      ];

    onRoundsChange?.(updatedRounds);
  };

  // =========================
  // MARK PASSED
  // =========================

  const setPassed = (index: number) => {
    const roundNumber = index + 1;

    // If a previous round has already been rejected,
    // do not allow passing rounds after it.
    if (
      rejectedRound !== null &&
      roundNumber > rejectedRound
    ) {
      return;
    }

    // Clear rejection if user marks a round passed
    onRejectedRoundChange?.(null);

    onRoundsPassedChange?.(roundNumber);
  };

  // =========================
  // MARK REJECTED
  // =========================

  const setRejected = (index: number) => {
    const roundNumber = index + 1;

    /*
      Example:

      Round 1
      Round 2  <-- rejected

      Then:

      roundsPassed = 1
      rejectedRound = 2
    */

    // All rounds before this round are passed
    onRoundsPassedChange?.(
      roundNumber - 1
    );

    // This exact round is rejected
    onRejectedRoundChange?.(
      roundNumber
    );
  };

  // =========================
  // DISPLAY PASSED COUNT
  // =========================

  const displayedPassedCount =
    rejectedRound !== null
      ? Math.max(
          0,
          rejectedRound - 1
        )
      : Math.min(
          roundsPassed,
          rounds.length
        );

  return (
    <div className="interview-rounds">

      {/* =========================
          HEADER
      ========================= */}

      <div className="interview-rounds-header">
        <div>
          <h4>
            Interview Progress
          </h4>

          <p>
            {displayedPassedCount} of{" "}
            {rounds.length} rounds passed
          </p>
        </div>

        <div className="interview-rounds-count">
          {displayedPassedCount}/
          {rounds.length}
        </div>
      </div>

      {/* =========================
          TIMELINE
      ========================= */}

      {rounds.length > 0 && (
        <div className="interview-rounds-timeline">

          {rounds.map((round, index) => {
            const roundNumber = index + 1;

            /*
              IMPORTANT:

              Rejected round has priority.

              So if:
              roundsPassed = 3
              rejectedRound = 3

              Round 3 will be RED,
              NOT green.
            */

            const isRejected =
              rejectedRound ===
              roundNumber;

            /*
              Only rounds BEFORE rejected round
              can be passed.
            */

            const isPassed =
              !isRejected &&
              roundNumber <=
                roundsPassed &&
              (
                rejectedRound === null ||
                roundNumber <
                  rejectedRound
              );

            /*
              Anything AFTER rejected round
              must remain pending.
            */

            const isAfterRejected =
              rejectedRound !== null &&
              roundNumber >
                rejectedRound;

            /*
              Current round only exists when
              there is no rejection.

              This prevents the timeline from
              jumping to the next round after
              rejection.
            */

            const isCurrent =
              rejectedRound === null &&
              !isPassed &&
              !isAfterRejected &&
              roundNumber ===
                roundsPassed + 1;

            return (
              <React.Fragment
                key={round.id}
              >

                {/* =========================
                    ROUND
                ========================= */}

                <div
                  className={`interview-round ${
                    isRejected
                      ? "rejected"
                      : isPassed
                        ? "passed"
                        : isCurrent
                          ? "current"
                          : "pending"
                  }`}
                >

                  {/* Circle */}

                  <div className="interview-round-circle">
                    {isRejected
                      ? "×"
                      : isPassed
                        ? "✓"
                        : roundNumber}
                  </div>

                  {/* Content */}

                  <div className="interview-round-content">

                    {editable ? (
                      <input
                        value={round.name}
                        onChange={(e) =>
                          renameRound(
                            round.id,
                            e.target.value
                          )
                        }
                        className="interview-round-name-input"
                      />
                    ) : (
                      <div className="interview-round-name">
                        {round.name}
                      </div>
                    )}

                    <div className="interview-round-status">

                      {isRejected
                        ? "Rejected"
                        : isPassed
                          ? "Passed"
                          : isCurrent
                            ? "Current"
                            : "Pending"}

                    </div>
                  </div>

                  {/* =========================
                      EDIT CONTROLS
                  ========================= */}

                  {editable && (
                    <div className="interview-round-controls">

                      <button
                        type="button"
                        onClick={() =>
                          moveRound(
                            index,
                            "left"
                          )
                        }
                        disabled={
                          index === 0
                        }
                        title="Move left"
                      >
                        ←
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          moveRound(
                            index,
                            "right"
                          )
                        }
                        disabled={
                          index ===
                          rounds.length - 1
                        }
                        title="Move right"
                      >
                        →
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeRound(
                            round.id
                          )
                        }
                        title="Remove round"
                      >
                        ×
                      </button>

                    </div>
                  )}

                  {/* =========================
                      PASS / REJECT BUTTONS
                  ========================= */}

                  {editable &&
                    !isAfterRejected && (
                      <div className="interview-round-actions">

                        <button
                          type="button"
                          className="interview-round-pass-btn"
                          onClick={() =>
                            setPassed(index)
                          }
                          disabled={
                            isPassed
                          }
                        >
                          {isPassed
                            ? "Passed"
                            : "Mark Passed"}
                        </button>

                        <button
                          type="button"
                          className="interview-round-reject-btn"
                          onClick={() =>
                            setRejected(index)
                          }
                          disabled={
                            isRejected
                          }
                        >
                          {isRejected
                            ? "Rejected"
                            : "Reject"}
                        </button>

                      </div>
                    )}

                </div>

                {/* =========================
                    CONNECTOR
                ========================= */}

                {index <
                  rounds.length - 1 && (
                  <div
                    className={`interview-round-connector ${
                      isPassed
                        ? "passed"
                        : isRejected
                          ? "rejected"
                          : ""
                    }`}
                  />
                )}

              </React.Fragment>
            );
          })}

        </div>
      )}

      {/* =========================
          ADD ROUND
      ========================= */}

      {editable && (
        <div className="interview-add-round">

          <input
            type="text"
            value={newRoundName}
            onChange={(e) =>
              setNewRoundName(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addRound();
              }
            }}
            placeholder="Enter round name..."
          />

          <button
            type="button"
            onClick={addRound}
            disabled={
              !newRoundName.trim()
            }
          >
            + Add Round
          </button>

        </div>
      )}

    </div>
  );
};

export default InterviewRounds;