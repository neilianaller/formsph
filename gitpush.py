import subprocess
import datetime

def run_git_commands():
    # 1. Get current date and time
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_message = f"Update: {now}"

    try:
        # 2. git add .
        subprocess.run(["git", "add", "."], check=True)
        
        # 3. git commit -m "date and time"
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        
        # 4. git push
        # Note: This assumes your upstream is already set
        subprocess.run(["git", "push"], check=True)
        
        print(f"Successfully pushed changes with message: '{commit_message}'")
                                
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while executing Git commands: {e}")

if __name__ == "__main__":
    run_git_commands()