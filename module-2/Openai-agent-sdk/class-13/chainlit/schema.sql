-- Chainlit persistence schema for SQLite.
--
-- Column names are camelCase because SQLAlchemyDataLayer builds its SQL directly
-- from the StepDict / ElementDict / ThreadDict keys (see chainlit/step.py:304 and
-- chainlit/element.py:107). Every key those to_dict() methods can emit needs a
-- column here, or the INSERT fails at write time with a bare "no such column".
--
-- Dict-valued fields (metadata, generation, props) arrive JSON-encoded, so TEXT.

CREATE TABLE IF NOT EXISTS users (
    "id"          TEXT PRIMARY KEY,
    "identifier"  TEXT NOT NULL UNIQUE,
    "createdAt"   TEXT,
    "metadata"    TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS threads (
    "id"              TEXT PRIMARY KEY,
    "createdAt"       TEXT,
    "name"            TEXT,
    "userId"          TEXT,
    "userIdentifier"  TEXT,
    "tags"            TEXT,
    "metadata"        TEXT,
    FOREIGN KEY ("userId") REFERENCES users("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS steps (
    "id"             TEXT PRIMARY KEY,
    "name"           TEXT NOT NULL,
    "type"           TEXT NOT NULL,
    "threadId"       TEXT NOT NULL,
    "parentId"       TEXT,
    "streaming"      INTEGER NOT NULL DEFAULT 0,
    "waitForAnswer"  INTEGER,
    "isError"        INTEGER,
    "metadata"       TEXT,
    "tags"           TEXT,
    "input"          TEXT,
    "output"         TEXT,
    "createdAt"      TEXT,
    "command"        TEXT,
    "start"          TEXT,
    "end"            TEXT,
    "generation"     TEXT,
    "showInput"      TEXT,
    "defaultOpen"    INTEGER,
    "autoCollapse"   INTEGER,
    "language"       TEXT,
    "indent"         INTEGER
);

CREATE TABLE IF NOT EXISTS elements (
    "id"            TEXT PRIMARY KEY,
    "threadId"      TEXT,
    "type"          TEXT,
    "url"           TEXT,
    "chainlitKey"   TEXT,
    "name"          TEXT NOT NULL,
    "display"       TEXT,
    "objectKey"     TEXT,
    "size"          TEXT,
    "page"          INTEGER,
    "language"      TEXT,
    "forId"         TEXT,
    "mime"          TEXT,
    "props"         TEXT,
    "autoPlay"      INTEGER,
    "playerConfig"  TEXT
);

CREATE TABLE IF NOT EXISTS feedbacks (
    "id"        TEXT PRIMARY KEY,
    "forId"     TEXT NOT NULL,
    "threadId"  TEXT NOT NULL,
    "value"     INTEGER NOT NULL,
    "comment"   TEXT
);

-- list_threads joins steps on threadId and sorts by MAX(steps.createdAt);
-- without these the sidebar degrades to a full scan on every page load.
CREATE INDEX IF NOT EXISTS idx_threads_userid   ON threads("userId");
CREATE INDEX IF NOT EXISTS idx_steps_threadid   ON steps("threadId");
CREATE INDEX IF NOT EXISTS idx_elements_threadid ON elements("threadId");
CREATE INDEX IF NOT EXISTS idx_feedbacks_forid  ON feedbacks("forId");
