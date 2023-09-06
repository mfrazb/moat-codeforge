DELETE FROM user_sessions
WHERE date_created + interval '10 seconds' < CURRENT_TIMESTAMP;