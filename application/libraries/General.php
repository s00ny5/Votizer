<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * CodeIgniter TopCMS Library
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	General
 * 
 */
 
class General 
{
	private $_ci;

	function __construct()
	{
		// Create an instance of CodeIgniter
		$this->_ci = &get_instance();
	}
	
	//FRONTEND START//

    public function getHeaderNavigation()
    {
        return $this->_ci->db->order_by("position", "asc")->get('top_navigation_header')->result_array();
    }
	
	// location 0: top
	// location 1: sidebar
	
	public function getAdvertisements($location)
	{
		return $this->_ci->db->get_where('top_advertisements', array('location' => $location))->result_array();
	}
	
	//FRONTEND END---//
	
	//--------------//
	
	//BACKEND START//
	public function getXMLData($url)
	{
		$doc = new DOMDocument();
		$doc->load($url);
		$arrFeeds = array();
		foreach ($doc->getElementsByTagName('topic') as $node) 
		{
			$itemRSS = array ( 
				'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
				'content' => $node->getElementsByTagName('content')->item(0)->nodeValue,
				'date' => $node->getElementsByTagName('date')->item(0)->nodeValue
			);
			array_push($arrFeeds, $itemRSS);
		}
		
		return $arrFeeds;
	}
	
	public function searchData($table, $data)
	{
		return $this->_ci->db->select('*')->like($data)->get($table)->result_array();
	}
	
	public function getNavigationData()
	{
		return $this->_ci->db->get('top_navigation')->result_array();
	}

	public function isIPBlacklisted($ip)
	{
		$query = $this->_ci->db->get_where('top_blacklist_ip', array('ip' => $ip));
		
		if($query->num_rows() > 0)
			return true;
		else
			return false;
	}

    public function isUrlBlacklisted($url)
	{
        $query = $this->_ci->db->get_where('top_blacklist_url', array('url' => $url));

        if($query->num_rows() > 0)
            return true;
        else
            return false;
    }

    public function isWordBlacklisted($word)
	{
        $query = $this->_ci->db->get_where('top_blacklist_profanity', array('word' => $word));

        if($query->num_rows() > 0)
            return true;
        else
            return false;
    }
	
	public function insertBlacklistIP($ip)
	{
		if(!self::isIPBlacklisted($ip))
		{
			$data = array(
				'ip' => $ip
			);
			
			return $this->_ci->db->insert('top_blacklist_ip', $data);
		}
		else
			return false;
	}

    public function banWord($word)
    {
        if(!self::isWordBlacklisted($word)) 
		{
            $data = array(
                'word' => $word            
			);

            return $this->_ci->db->insert('top_blacklist_profanity', $data);
        }
        return false;
    }

    public function banUrl($url)
    {
        if(!self::isUrlBlacklisted($url))
        {
            $data = array(
                'url' => $url
            );

            return $this->_ci->db->insert('top_blacklist_url', $data);
        }
        return false;
    }

	public function removeBlacklistIP($ip)
	{
		if(self::isIPBlacklisted($ip))
		{
			$data = array(
				'ip' => $ip
			);
			
			return $this->_ci->db->delete('top_blacklist_ip', $data);
		}
		else
			return false;
	}

    public function removeBlacklistUrl($id)
    {
        $data = array(
            'id' => $id
        );

        return $this->_ci->db->delete('top_blacklist_url', $data);
    }

    public function removeBlacklistProfanity($id)
    {
        $data = array(
            'id' => $id
        );
        return $this->_ci->db->delete('top_blacklist_profanity', $data);
    }
	
	public function updateBlacklistUser($id, $new)
	{
		$data = array(
			'blacklist' => $new
		);
		
		if($this->_ci->db->where('id', $id)->update('top_users', $data))
			return true;
		else 
			return false;
	}
	
	public function getBlacklistData()
	{
		return $this->_ci->db->get('top_blacklist_ip')->result_array();
	}
	
	public function getBlacklistUserData()
	{
		return $this->_ci->db->get_where('top_users', array('blacklist' => 1))->result_array();
	}

    public function getBlacklistUrlData()
    {
        return $this->_ci->db->get('top_blacklist_url')->result_array();
    }

    public function getBlacklistProfanityData()
    {
        return $this->_ci->db->get('top_blacklist_profanity')->result_array();
    }

	public function insertUserActivity($ip)
	{
		$date = date("Y-m-d");
		$data = array(
			'ip' => $ip,
			'date' => $date
		);
		
		return $this->_ci->db->insert('top_users_activity', $data);
	}
	
	public function getUserActivityData($type, $unique)
	{
		if(!$unique)
		{
			if($type == "today")
			{
				$date = date("Y-m-d");
				$query = $this->db->query("SELECT COUNT(DISTINCT ip,`date`) as `total` FROM top_users_activity WHERE `date` >= ?", array($date));
			}
			else
			{
				$date = date("Y-m-d", time() - 60*60*24*30);
				$query = $this->db->query("SELECT COUNT(DISTINCT ip) as `total` FROM top_users_activity WHERE `date` >= ?", array($date));
			}
			
			$row = $query->result_array();
			
			return $row[0]['total'];
		}
		else
		{
			if($type == "today")
			{
				$date = date("Y-m-d");
			}
			else
			{
				$date = date("Y-m-d", time() - 60*60*24*30);
			}

			$query = $this->db->query("SELECT COUNT(*) as `total` FROM top_users_activity WHERE `date` >= ?", array($date));

			$row = $query->result_array();
			
			return $row[0]['total'];
		}
	}
	
	public function getIncome($type)
	{
		if($type == "this")
		{
			$date = date("Y-m");
		}
		else
		{
			$date = date("Y-m", time() - 60*60*24*30);
		}

		$query = $this->db->query("SELECT amount FROM top_monthly_income WHERE month=?", array($date));

		if($query->num_rows())
		{
			$row = $query->result_array();

			return $row[0]['amount'];
		}
		else
		{
			return 0;
		}
	}
	
	public function getGraph()
	{
		$query = $this->_ci->db->query("SELECT date, COUNT(DISTINCT ip) ipCount FROM top_users_activity GROUP BY date");

		if($query->num_rows())
		{
			return $query->result_array();
		}
		else
		{
			return false;
		}
	}
}

// END General Class

/* End of file General.php */
/* Location: ./application/libraries/General.php */